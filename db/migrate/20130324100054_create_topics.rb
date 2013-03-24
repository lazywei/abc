class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :title
      t.date :published_at
      t.text :transcript
      t.string :audio
      t.string :url

      t.timestamps
    end
  end
end
