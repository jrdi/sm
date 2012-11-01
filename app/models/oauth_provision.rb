class OauthProvision < ActiveRecord::Base
  belongs_to :user

  attr_accessible :uid, :provider
end
