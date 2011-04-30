module Sm
  module Data
    
    DEFAULT_USER = :user

    def attributes_for_user(attributes_or_fixture = {})
      if attributes_or_fixture.is_a?(Hash)
        attributes = attributes_or_fixture
        fixture = DEFAULT_USER
      else
        attributes = {}
        fixture = attributes_or_fixture
      end

      default_attributes = case fixture
        when :user
          {
            :email => 'test@email.com',
            :password => 'secret',
            :password_confirmation => 'secret'
          }
        else
          raise "Invalid fixture name"
      end
      default_attributes.merge(attributes)
    end 
    
    def new_user(attributes_or_fixture = {})
      User.new(attributes_for_user(attributes_or_fixture))
    end

    def create_user(attributes_or_fixture = {})
      r = new_user(attributes_or_fixture)
      r.save
      r.reload
    end
  end
end