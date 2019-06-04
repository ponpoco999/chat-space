class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    respond_to do |format|
      format.html
      format.json { @new_message = @group.messages.where('id > ?', params[:id]) }
    end
  end
end
