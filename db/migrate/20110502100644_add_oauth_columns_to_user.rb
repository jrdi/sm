class AddOauthColumnsToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :uid, :integer
    add_column :users, :name, :string
    add_column :users, :oauth, :string
  end

  def self.down
    remove_column :users, :uid
    remove_column :users, :name
    remove_column :users, :oauth
  end
end
