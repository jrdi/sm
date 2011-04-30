require File.expand_path('../../test_helper', __FILE__)

class UserTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "our data is valid" do
    user = create_user
    
    assert user.valid?
    assert !user.new_record?
  end
  
  test "invalid data" do
    user = User.new
    
    assert !user.valid?
    assert user.new_record?
    
    assert_not_nil user.errors[:email], "Email: #{user.errors[:email].inspect}"
    assert_not_nil user.errors[:password], "Pasword: #{user.errors[:password].inspect}"
    assert_not_nil user.errors[:password_confirmation], "Pasword confirmation: #{user.errors[:password_confirmation].inspect}"
  end
  
  test "relationships" do
    user = create_user
    assert_empty user.questions
    
    user.questions << Question.new
    assert_not_empty user.questions
  end
  
  test "destroy" do
    user = create_user
    
    assert_difference "User.count", -1 do
      user.destroy
    end
  end
end
