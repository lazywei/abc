class TopicsController < ApplicationController
  def index
    @topics = Topic.page(params[:page])
  end

  def show
    @topic = Topic.find(params[:id])
  end

  def by_date
    @date = [params[:year].to_i, params[:month].to_i]
    @topics = Topic.find_by_date(@date[0], @date[1]).page(params[:page])
    render :template => 'topics/index'
  end
end
