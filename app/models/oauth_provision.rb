class OauthProvision < ActiveRecord::Base
  belongs_to :user

  attr_accessible :uid, :provider

  validates :uid, :provider, :user_id, presence: true
  validates_uniqueness_of :uid, scope: :provider
end
