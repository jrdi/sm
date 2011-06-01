class String

  def to_keywords
    self.downcase.gsub(/[(,?!\'":.)]#{blacklist}/, '').split(" ")
  end
  
  private
  def blacklist
    blacklist = [
      'de', 'por', 'a', 'ha', 'del', 'un', 'ya', 'que'
    ]
    return '|\b' + blacklist.join('\b|\b') + '\b'
  end
end