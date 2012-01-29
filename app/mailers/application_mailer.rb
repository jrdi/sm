class ApplicationMailer < ActionMailer::Base
  default :from => "mama@socorromama.com"
  
  def contact(email)
    @email = email
    mail(:to => "mama@socorromama.com",
         :from => email.email,
         :subject => email.subject || '')
  end

  def answer_notification(answer, question, user)
  	@answer = answer
  	@question = question
  	@question_url = question_url(@question)
    @user = user
    mail(:to => user.email,
         :subject => "Nueva respuesta a tu pregunta en Socorro mamá!")
  end
end
