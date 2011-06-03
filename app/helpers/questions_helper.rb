module QuestionsHelper
  def voted?(answer, value = 1)
    @answer_vote = current_user.answer_vote(answer).first
    unless @answer_vote.blank?
      return 'voted' if @answer_vote.value == value
    end
  end
end
