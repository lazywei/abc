class Topic < ActiveRecord::Base
  attr_accessible :audio, :published_at, :title, :transcript, :url
  default_scope order('published_at DESC')

  def self.find_by_date(year, month)
    where(:published_at => Date.new(year, (month || 1), 1)..Date.new(year, (month || -1), -1))
  end
end
