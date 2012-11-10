ActiveAdmin::Dashboards.build do

  section "Last questions" do
    table_for Question.order('id desc').limit(10) do |question|
      question.column("Status") { |question| status_tag (question.answered? ? "Answered" : "Pending"), (question.answered? ? :ok : :error) }
      question.column("Title") { |question| link_to question.title, admin_question_path(question) }
      question.column("User") { |question| question.user.name || question.user.email }
      question.column("Date") { |question| l(question.created_at, format: :short) }
    end
  end

  section "Last questions" do
    table_for Answer.order('id desc').limit(10) do |answer|
      answer.column("Question") { |answer| link_to answer.question.title, admin_question_path(answer.question) }
      answer.column("Content") { |answer| truncate(answer.content, length: 50) }
      answer.column("User") { |answer| answer.user.name || answer.user.email }
      answer.column("Date") { |answer| l(answer.created_at, format: :short) }
    end
  end
end
