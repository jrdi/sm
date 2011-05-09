class AddAnswersCount < ActiveRecord::Migration
  def self.up
    add_column :questions, :answers_count, :integer, :default => 0
    # 
    # Question.reset_column_information
    # Question.all.each do |q|
    #   Question.update_counters q.id, :answers_count => q.answers.length
    # end  
  end

  def self.down
    remove_column :questions, :answers_count
  end
end
