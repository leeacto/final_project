# hard tabs in this file
class AccountsController < ApplicationController
	def update
    # so if the user posts to this URL twice (maybe they refresh their browser or something)
    # they would activate themselves, then de-activate their account? why aren't you passing a
    # param to control which path you take?
		user = User.find(params[:format])
			if user.is_active?
				user.deactivate_account!
				session.clear
				flash[:error] = "we are sorry to see you go,come back anytime"
				redirect_to root_path
			else
				user.activate_account!
				redirect_to login_path
			end	
	end
end
