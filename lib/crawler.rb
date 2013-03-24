class Crawler
  def initialize 
    @base_url = 'http://www.scientificamerican.com'
  end

  def crawl_list
    data = []

    endDate = Time.now.to_date.to_s.split('-')
    endDate = endDate[1..-1].push(endDate[0][2..-1]).join('/')

    0.upto(1) do |i|
      url = "#{@base_url}/view/utils/Archive.cfc?method=loadContentScroll&maxRows=500&category_id=&contenttype_id=25&issue_column_id=&partnerFeatured=&author_id=&endDate=#{endDate}&startRow=#{i*500+1}"
      r = Typhoeus::Request.post(url)
      doc = Nokogiri::HTML(r.body)
      doc.css('li').each do |li|
        data << {
          :title => li.at_css('h3').content,
          :url => @base_url + li.at_css('h3 a').attr('href'),
          :published_at => Date.strptime(li.at_css('span.datestamp').content,  '%b %d, %Y')
        }
      end
    end

    return data
  end

  def crawl_details(datas)
    datas.each do |data|
      r = Typhoeus::Request.get(data[:url])
      doc = Nokogiri::HTML(r.body)
      data[:audio] = @base_url + '/podcast/' + doc.at_css('p#episodeLinks a').attr('href')
      data[:transcript] = doc.css('div#articleContent p').map(&:content)[1..-2].join('\n')
      Topic.create!(data)
    end
  end
end
