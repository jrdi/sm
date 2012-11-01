class Tag < ActiveRecord::Base
  # Relations
  has_and_belongs_to_many :questions, :uniq => true
  # Validations
  validates :name, presence: true, uniqueness: true
  
  attr_accessible :string

  def to_param
    "#{id}-#{name.parameterize}"
  end
end
