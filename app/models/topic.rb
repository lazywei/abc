class Topic < ActiveRecord::Base
  attr_accessible :audio, :published_at, :title, :transcript, :url
end
