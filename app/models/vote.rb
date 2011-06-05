class Vote < ActiveRecord::Base
  # Relations
  belongs_to :user
  belongs_to :votable, :polymorphic => true
  # Validations
  validates_presence_of :votable_id, :votable_type, :user_id, :value
  validates_uniqueness_of :user_id, :scope => [:votable_id, :votable_type]
  
  scope :positive, where(:value => 1)
  scope :negative, where(:value => -1)
  
  after_create :update_vote_created
  after_destroy :update_vote_destroyed
  
  def update_vote_created
    votable.update_attribute(:votes_count, votable.votes_count + value) unless value.blank?
  end
  
  def update_vote_destroyed
    votable.update_attribute(:votes_count, votable.votes_count - value) unless value.blank?
  end
end
