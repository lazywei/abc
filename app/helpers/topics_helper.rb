module TopicsHelper
  def render_date(date)
    raw("[" + link_to(date.strftime('%Y - %m'), by_date_topics_path(:year=>date.year, :month=>date.month), :style => 'margin: 15px')+ "]")
  end
end
