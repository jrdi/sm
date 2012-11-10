ActiveAdmin.register User do
  menu :priority => 2

  scope :all, default: true
  scope :registered_this_week do |users|
    users.where(created_at: 1.week.ago..Time.now)
  end
  scope :with_oauth do |users|
    users.joins(:oauth_provisions).where(oauth_provisions: {:provider => %w(facebook twitter)})
  end
  scope :unconfirmed do |users|
    users.where(confirmed_at: nil)
  end

  index do
    selectable_column
    column :name
    column :email
    column :current_sign_in_at
    column :sign_in_count
    column :oauth do |user|
      user.oauth_provisions.map(&:provider).join(', ')
    end
    default_actions
  end  
end
