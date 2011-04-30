require File.expand_path('../../test_helper', __FILE__)

class UserTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "our data is valid" do
    question = create_question
    
    assert question.valid?
    assert !question.new_record?
  end
  
  test "invalid data on create" do
    question = Question.create
    
    assert !question.valid?
    assert question.new_record?
    
    assert_not_nil question.errors[:title], "Title: #{question.errors[:title].inspect}"
    assert_not_nil question.errors[:user_id], "User: #{question.errors[:user_id].inspect}"
  end
  
  test "invalid data on update" do
    question = create_question
    
    assert question.update_attributes({:user_id => nil}), "User: #{question.errors[:user_id].inspect}"
    assert !question.update_attributes({:title => nil}), "Title: #{question.errors[:title].inspect}"
  end
  
  test "relationships" do
    question = create_question
    assert_not_nil question.user
  end
  
  test "destroy" do
    question = create_question
    
    assert_difference "Question.count", -1 do
      question.destroy
    end
  end
end
