class Question < ActiveRecord::Base
  # Relations
  belongs_to :user
  has_many :answers, :dependent => :destroy
  has_and_belongs_to_many :tags, :uniq => true
  # Validations
  validates_presence_of :title
  validates_presence_of :user_id, :on => :create
  validates_uniqueness_of :title
  
  scope :without_answers, lambda {
    where(answers_count: 0).order('created_at DESC')
  }

  scope :populars, lambda { 
    where('answers_count > ?', 0).order('answers_count DESC')
  }
  
  def answered?
    answers.each{|a| return true if a.votes_count > 0}
    return false
  end
  
  def valid_answer
    valid_answer = answers.order('votes_count DESC').limit(1).first
    return valid_answer if valid_answer.present? && valid_answer.votes_count > 0
    return nil
  end
  
  def as_json(options={})
    json = { :methods => [:answered?, :to_param], 
             :include => { 
                          :user => {:only => [:id, :name]}, 
                          :tags => {:only => [:name], :methods => [:to_param]}
                         }
           }
    json.merge! :methods => options[:methods] if options[:methods].present?
    json.merge! :include => options[:include] if options[:include].present?
    
    super(json)
  end
  
  def to_param
    "#{id}-#{title.parameterize}"
  end
  
  # TO-DO: Research to rewritte << method and stop using this
  def tags=(string_tags)
    tags = string_tags.split(%r{,\s*})
    tags.each{ |tag| self.tags << Tag.find_or_create_by_name(tag) }
  end
end
