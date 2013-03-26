module TopicsHelper
  def render_topic_date(date)
    raw(link_to(date.strftime('%Y'), by_date_topics_path(:year=>date.year))) + " / " +
      raw(link_to(date.strftime('%m'), by_date_topics_path(:year=>date.year, :month => date.month))) + 
      date.strftime(' / %d')
  end

  def render_date_range(date)
    if date.nil?
      return ''
    elsif date[1].nil?
      Date.new(@date[0]).strftime('%Y')
    else
      Date.new(@date[0], @date[1]).strftime('%Y %b')
    end
  end
end
