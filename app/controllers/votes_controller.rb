class VotesController < ApplicationController
  def create
    @vote = Vote.new(params[:vote])
    @vote.user = current_user
    
    if @vote.save
      respond_to do |format|
        format.html { redirect_to(root_url, :notice => 'El voto ha sido guardado correctamente.') }
        format.js
      end
    else
      respond_to do |format|
        format.html { redirect_to(root_url, :alert => 'El voto no ha podido ser guardado correctamente.') }
        format.js
      end
    end
  end
end
