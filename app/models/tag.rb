class Tag < ActiveRecord::Base
  # Relations
  has_and_belongs_to_many :questions, :uniq => true
  # Validations
  validates_presence_of :name
  validates_uniqueness_of :name
end
