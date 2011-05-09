class Vote < ActiveRecord::Base
  # Relations
  belongs_to :user
  belongs_to :votable, :polymorphic => true, :counter_cache => true
  # Validations
  validates_presence_of :votable_id, :votable_type, :user_id, :value
  validates_uniqueness_of :user_id, :scope => [:votable_id, :votable_type]
end
