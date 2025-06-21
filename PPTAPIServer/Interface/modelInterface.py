class ModelInterface: 
    def __new__(self, data):
       self.data = data
       if data == [] or len(data) < 1 or data == False:
           return self.data
       if data == "BAD_QUERY_RESPONSE":
            return self.data
       if data == "SUCCESS_QUERY_RESPONSE":
             return self.data
       if data == "DELETE_QUERY_RESPONSE":
           return self.data
       if data == "EMPTY_QUERY_RESPONSE":
           return self.data
       return self.data
           
           
