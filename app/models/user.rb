class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable, :omniauthable, 
         :recoverable, :rememberable, :trackable, :validatable

  has_many :oauth_provisions, dependent: :destroy
  has_many :questions
  has_many :answers
  has_many :votes

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :current_password, :password, :password_confirmation, :remember_me
  attr_accessor :current_password

  def answer_vote(answer)
    votes.where(:votable_id => answer.id, :votable_type => answer.class)
  end

  def add_oauth_provision!(auth)
    self.oauth_provisions.build(uid: auth.uid, provider: auth.provider).save
  end

  protected
  def self.create_with_oauth!(email, auth, skip_confirmation = false)
    user = new(email: email, 
              password: Devise.friendly_token[0,20], 
              name: auth.info.name)

    user.skip_confirmation! if skip_confirmation
    user.save && user.add_oauth_provision!(auth) && user
    user
  end

  def self.find_for_oauth(auth)
    User.joins(:oauth_provisions).readonly(false).where('oauth_provisions.uid' => auth.uid, 'oauth_provisions.provider' => auth.provider).first
  end

  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.find_for_oauth(auth)

    # Find user with Facebook account email
    if user.blank? 
      if (user = User.where(email: auth.info.email).first)
        user.add_oauth_provision!(auth)
      else # Create a user with a stub password.
        user = User.create_with_oauth!(auth.info.email, auth, true)
      end
    end
    user
  end
  
  def self.find_for_twitter_oauth(auth, signed_in_resource=nil)
    User.find_for_oauth(auth) || User.new
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
