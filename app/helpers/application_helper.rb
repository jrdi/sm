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
  
  def humanize_time_ago(time)
    if 0 != days = ((Time.now-time)/3600/24).floor
      pluralize( days , 'día', 'días' )
    elsif 0 != hours = ((Time.now-time)/3600).floor
      pluralize( hours , 'hora', 'horas' )
    elsif 0 != minutes = ((Time.now-time)/60).floor
      pluralize( minutes, 'minuto', 'minutos' )
    else
      "menos de un minuto."
    end
  end
end
