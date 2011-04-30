module Sm
  module Data
    
    DEFAULT_QUESTION = :question

    def attributes_for_question(attributes_or_fixture = {})
      if attributes_or_fixture.is_a?(Hash)
        attributes = attributes_or_fixture
        fixture = DEFAULT_QUESTION
      else
        attributes = {}
        fixture = attributes_or_fixture
      end

      default_attributes = case fixture
        when :question
          {
            :title => "Como se cambia el butano?",
            :description => "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivia un hidalgo",
            :user => create_user
          }
        else
          raise "Invalid fixture name"
      end
      default_attributes.merge(attributes)
    end 
    
    def new_question(attributes_or_fixture = {})
      Question.new(attributes_for_question(attributes_or_fixture))
    end

    def create_question(attributes_or_fixture = {})
      r = new_question(attributes_or_fixture)
      r.save
      r.reload
    end
  end
end