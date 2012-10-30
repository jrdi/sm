class CreateVotes < ActiveRecord::Migration
  def self.up
    create_table :votes do |t|
      t.references :user
      t.integer :votable_id
      t.string :votable_type
      t.integer :value
      
      t.timestamps
    end
  end

  def self.down
    drop_table :votes
  end
end
