class Email
  attr_accessor :name, :email, :subject, :message  
  attr_accessor :errors
  
  include ActiveModel::Validations

  validates_presence_of :name, :email, :message
  
  def initialize(opts = {})
    @errors = ActiveModel::Errors.new(self)

    @name = opts[:name]
    @email = opts[:email]
    @subject = opts[:subject]
    @message = opts[:message]
    
    run_validations!
  end
end