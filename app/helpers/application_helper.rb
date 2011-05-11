# encoding: UTF-8

module ApplicationHelper
  def title(title)
    content_for :title do
      title
    end
    title
  end
  
  def selected?(controller, action)
    if params[:controller] == controller && params[:action] == action
      return :class => 'selected'
    end
  end
  
  def tab_selected?(param, tab = 'default')
    if param == tab
      return "class = 'selected'"
    elsif (param.blank? || param == 'all') && tab == 'default'
      return "class = 'selected'"
    end
  end
end
