namespace :update_topic do
  desc "update tpoics"
  task :update => :environment do
    c = Crawler.new
    c.crawl_details(c.crawl_update)
  end

  desc "clean duplicate tpoics"
  task :clean => :environment do
    q = ActiveRecord::Base.connection.execute(" SELECT a.id, a.url, count(a.url), MAX(a.id) FROM `topics` a
        INNER JOIN `topics` b ON a.url = b.url
        WHERE a.id != b.id
        GROUP BY a.url")
    q.each do |row|
      id = row[0]
      topic = Topic.find(id)
      topic.destroy
    end
  end

end
