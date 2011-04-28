class Question < ActiveRecord::Base
  # Relations
  belongs_to :user
  # Validations
  validates_presence_of :title
  validates_uniqueness_of :title
end
