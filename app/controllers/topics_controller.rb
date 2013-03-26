class TopicsController < ApplicationController
  def index
    @topics = Topic.page(params[:page])
  end

  def by_date
    @date = [params[:year].to_i, params[:month].nil? ? nil : params[:month].to_i]
    @topics = Topic.find_by_date(@date[0], @date[1]).page(params[:page])
    render :template => 'topics/index'
  end
end
