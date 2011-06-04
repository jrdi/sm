class ApplicationMailer < ActionMailer::Base
  default :from => "mama@socorromama.com"
  
  def contact(email)
    @email = email
    mail(:to => "mama@socorromama.com",
         :from => email.email,
         :subject => email.subject || '')
  end   
end
