class VotesController < ApplicationController
  def create
    answer = Answer.find(params[:answer_id])
    @vote = answer.votes.build(
      value: params[:vote][:value],
      user_id: current_user.id
    )
    
    respond_to do |format|    
      if @vote.save
        format.html { redirect_to(root_url, :notice => 'El voto ha sido guardado correctamente.') }
        format.js
      else
        format.html { redirect_to(root_url, :alert => 'El voto no ha podido ser guardado correctamente.') }
        format.js
      end
    end
  end
end
