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
      return 'selected'
    end
  end
  
  def tab_selected?(param, tab = 'default')
    if param == tab
      return 'selected'
    elsif (param.blank? || param == 'all' || param == 'votes_count') && tab == 'default'
      return 'selected'
    end
  end
  
  def meta(field = nil, list = nil)
    field = field.to_s
    @meta ||= {
      'robots' => ['all'],
      'copyright' => ['My Copyright'],
      'content-language' => ['es'],
      'description' => ["Socorro Mamá es una aplicación de preguntas y respuestas para resolver tus dudas del hogar (cocina, limpieza, mantenimiento...) sin tener que molestar a tu madre una vez más."],
      'keywords' => ['consejos', 'respuestas', 'hogar', 'casa', 'limpieza', 'cocina', 'recetas', 'mantenimiento']
    }

    if field.present?
      case list.class.to_s
        when 'Array' then
          @meta[field] = list
        when 'String' then
          @meta[field] = [list]
      end
      
      case field
        when 'description' then
          content = truncate(strip_tags(h(@meta[field].join(', '))), :length => 255)
        else
          content = @meta[field].join(', ')
      end

      return raw(%(<meta name="#{h(field)}" content="#{h(content)}"/>))
    else
      tags = []
      @meta.each do |field, list|
        tags << meta(field)
      end
      return tags.join("\n")
    end
  end
  
  def button_tag(content_or_options = nil, options = nil, &block)
    options = content_or_options if block_given? && content_or_options.is_a?(Hash)
    options ||= {}
    options.stringify_keys!

    if disable_with = options.delete("disable_with")
      options["data-disable-with"] = disable_with
    end

    if confirm = options.delete("confirm")
      options["data-confirm"] = confirm
    end

    options.reverse_merge! 'name' => 'button', 'type' => 'submit'

    content_tag :button, content_or_options || 'Button', options, &block
  end 
end
