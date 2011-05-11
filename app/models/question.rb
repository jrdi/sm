class Question < ActiveRecord::Base
  # Relations
  belongs_to :user
  has_many :answers, :dependent => :destroy
  has_and_belongs_to_many :tags, :uniq => true
  #has_many :votes, :as => :votable, :dependent => :destroy
  # Validations
  validates_presence_of :title
  validates_presence_of :user_id, :on => :create
  validates_uniqueness_of :title
  
  def self.without_answers(options = {})
    Question.all(:conditions => 'answers_count = 0', :include => [:user], :order => 'created_at DESC', :limit => options[:limit])
  end
  
  def self.without_answers_count(options = {})
    Question.count(:conditions => 'answers_count = 0')
  end
  
  def self.populars(options = {})
    Question.all(:conditions => 'answers_count > 0', :include => [:user], :order => 'answers_count DESC', :limit => options[:limit])
  end
  
  def self.populars_count(options = {})
    Question.count(:conditions => 'answers_count > 0')
  end
  
  def answered?
    answers.each{|a| return true if a.votes.sum(:value) > 0}
    return false
  end
  
  def as_json(options={})
    json = { :methods => [:answered?], 
             :include => { 
                          :user => {:only => [:id, :name]}, 
                          :tags => {:only => [:id, :name]}
                         }
           }
    json.merge! :methods => options[:methods] if options[:methods].present?
    json.merge! :include => options[:include] if options[:include].present?
    
    super(json)
  end
  
  # TO-DO: Research to rewritte << method and stop using this
  def tags=(string_tags)
    tags = string_tags.split(%r{,\s*})
    tags.each{ |tag| self.tags << Tag.find_or_create_by_name(tag) }
  end
end
