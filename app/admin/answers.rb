ActiveAdmin.register Answer do
  menu :priority => 4

  index do
    selectable_column
    column :question do |answer|
      link_to answer.question.title, admin_question_path(answer.question)
    end
    column :content do |answer| 
      truncate(answer.content, length: 100)
    end
    column :votes do |answer|
      answer.votes_count
    end
    column :created_at
    column :updated_at
    default_actions
  end    
end
