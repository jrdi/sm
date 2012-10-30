class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable, :omniauthable, 
         :recoverable, :rememberable, :trackable, :validatable

  has_many :questions
  has_many :answers
  has_many :votes

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

  def answer_vote(answer)
    votes.where(:votable_id => answer.id, :votable_type => answer.class)
  end

  protected
  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    users = User.find(:all, :conditions => "(uid = #{auth.uid} AND oauth = 'Facebook') OR (email = '#{auth.info.email}')", :limit => 1)
    unless users.empty?
      users.first
    else # Create a user with a stub password.
      user = User.new(:email => data["email"], 
                      :password => Devise.friendly_token[0,20], 
                      :uid => data['id'], 
                      :name => data['name'],
                      :oauth => 'Facebook')
      user.skip_confirmation!
      user.save 
      user
    end
  end
  
  def self.find_for_twitter_oauth(auth, signed_in_resource=nil)
    users = User.find(:all, :conditions => "uid = #{auth.id} AND oauth = 'Twitter'", :limit => 1)
    unless users.empty?
      users.first
    else # Create a user with a stub password. 
      user = User.new(:email => "#{data['screen_name']}@example.com", 
                      :password => Devise.friendly_token[0,20], 
                      :uid => data['id'], 
                      :name => data['screen_name'],
                      :oauth => 'Twitter')
      user.skip_confirmation!
      user.save
      user
    end
  end
  
  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["user_hash"]
        user.email = data["email"]
      elsif data = session["devise.twitter_data"] && session["devise.twitter_data"]["extra"]["user_hash"]
        user.email = "#{data['screen_name']}@example.com"
      end
    end
  end
  
  def password_required?
    new_record?
  end
end
