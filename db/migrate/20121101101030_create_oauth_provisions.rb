class CreateOauthProvisions < ActiveRecord::Migration
  def up
    create_table :oauth_provisions do |t|
      t.references  :user
      t.integer     :uid
      t.string      :provider

      t.timestamps
    end

    add_column :users, :unconfirmed_email, :string # Only if using reconfirmable


    User.all.each do |user|
      if user.uid && user.oauth
        provision = user.oauth_provisions.build(
          uid: user.uid,
          provider: user.oauth.downcase
        )
        provision.save
      end
    end

    remove_column :users, :uid
    remove_column :users, :oauth
  end

  def down
    add_column :users, :uid, :integer
    add_column :users, :oauth, :string

    OauthProvision.all.each do |provision|
      provision.user.uid = provision.uid
      provision.user.oauth = provision.provider
      provision.user.save
    end

    drop_table :oauth_provisions

    remove_column :users, :unconfirmed_email    
  end
end
