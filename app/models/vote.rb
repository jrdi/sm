class Vote < ActiveRecord::Base
  # Relations
  belongs_to :user
  belongs_to :votable, :polymorphic => true
  # Validations
  validates_presence_of :votable_id, :votable_type, :user_id, :value
  validates_uniqueness_of :user_id, :scope => [:votable_id, :votable_type]
  
  scope :positive, where(:value => 1)
  scope :negative, where(:value => -1)
  
  def after_create
    votable.update_attribute(:votes_count, votable.votes_count + value) unless value.blank?
  end
  
  def after_destroy
    votable.update_attribute(:votes_count, votable.votes_count - value) unless value.blank?
  end
end
