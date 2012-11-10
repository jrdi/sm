ActiveAdmin.register User do
  index do
    selectable_column
    column :name
    column :email
    column :current_sign_in_at
    column :last_sign_in_at
    column :sign_in_count
    default_actions
  end  
end
