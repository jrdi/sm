class String

  def to_keywords
    self.downcase.gsub(/[(,?!\'":.)]#{blacklist}/, '').split(" ")
  end
  
  def to_html
    s = ERB::Util::html_escape(self)
    s.gsub!(/(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/) do |link|
      "<a href='#{link}' target='_blank'>#{link}</a>"
    end
    s.gsub!(/\*(.+)\*/) do |strong|
      "<strong>#{strong.gsub!(/\*/, '')}</strong>"
    end
    s.gsub!(/\_(.+)\_/) do |em|
      "<em>#{em.gsub!(/\_/, '')}</em>"
    end
    s.gsub!(/\-(.+)\-/) do |strike|
      "<s>#{strike.gsub!(/\_/, '')}</s>"
    end
    s.html_safe
  end
  
  private
  def blacklist
    blacklist = [
      'de', 'por', 'a', 'ha', 'del', 'un', 'ya', 'que'
    ]
    return '|\b' + blacklist.join('\b|\b') + '\b'
  end
end