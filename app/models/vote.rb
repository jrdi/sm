class Vote < ActiveRecord::Base
  # Relations
  belongs_to :user
  belongs_to :votable, :polymorphic => true
  # Validations
  validates :votable_id, :votable_type, :user_id, :value, presence: true
  validates_uniqueness_of :user_id, :scope => [:votable_id, :votable_type]
  validates :value, inclusion: { in: [-1, 1] }

  scope :positive, lambda { where(value: 1) }
  scope :negative, lambda { where(value: -1) }
  
  attr_accessible :value, :user_id

  after_create :update_vote_created
  after_destroy :update_vote_destroyed
  
  def update_vote_created
    votable.update_column(:votes_count, votable.votes_count + value) unless value.blank?
  end
  
  def update_vote_destroyed
    votable.update_column(:votes_count, votable.votes_count - value) unless value.blank?
  end
end
