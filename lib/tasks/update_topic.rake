namespace :update_topic do
  desc "update tpoics"
  task :update => :environment do
    c = Crawler.new
    c.crawl_details(c.crawl_update)
  end

end
