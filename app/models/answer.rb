class Answer < ActiveRecord::Base
  # Relations
  belongs_to :user
  belongs_to :question
  # Validations
  validates_presence_of :content
  validates_presence_of :user_id, :on => :create
end
