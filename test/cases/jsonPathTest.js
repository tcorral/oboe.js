(function(){

   TestCase("jsonPathTest", {
   
      testMatchesRoot: function() {
         givenAPattern('!')
            .thenShouldMatch(       [])
             .thenShouldNotMatch(   ['a'])
             .thenShouldNotMatch(   ['a','b'])
      }
      
   ,  testMatchesSingleStarAloneAgainstEveryObject: function() {
         givenAPattern('*')
            .thenShouldMatch(       [])
            .thenShouldMatch(       ['a'])
            .thenShouldMatch(       ['a', 2])
            .thenShouldMatch(       ['a','b'])
      }
      
   ,  testEmptyStringIsEquivalentToSingleStar: function() { 
         givenAPattern('')
            .thenShouldMatch(       [])
            .thenShouldMatch(       ['a'])
            .thenShouldMatch(       ['a', 2])
            .thenShouldMatch(       ['a','b'])
      }
                       
   ,  testMatchingForAllDescendantsOfRootMatchAnythingExceptTheRoot: function() {
         givenAPattern('!..*')
            .thenShouldNotMatch(    [])
            .thenShouldMatch(       ['a'])
            .thenShouldMatch(       ['a','b'])
      }
      
   ,  testMatchingNamedChildOfRootWorks: function() {
         givenAPattern('!.foo')
            .thenShouldMatch(       ['foo'])      
            .thenShouldNotMatch(    [])
            .thenShouldNotMatch(    ['foo', 'bar'])
            .thenShouldNotMatch(    ['bar'])
      }
      
   ,  testIsNotFooledBySubstringPatterns: function() {
         givenAPattern('!.foo')
            .thenShouldNotMatch(    ['foot'])      
      }      
      
   ,  testMatchingNamedAncestorOfRootWorks: function() {
         givenAPattern('!..foo')
             .thenShouldNotMatch(   [])         
            .thenShouldMatch(       ['foo'])      
            .thenShouldMatch(       ['a', 'foo'])
            .thenShouldNotMatch(    ['a', 'foo', 'a'])            
            .thenShouldMatch(       ['a', 'foo', 'foo'])
            .thenShouldMatch(       ['a', 'a', 'foo'])
            .thenShouldNotMatch(    ['a', 'a', 'foot'])            
            .thenShouldNotMatch(    ['a', 'foo', 'foo', 'a'])
      }
      
   ,  testAncestorOfRootRelationshipCanBeImplicit: function() {
         givenAPattern('foo')
             .thenShouldNotMatch(   [])         
            .thenShouldMatch(       ['foo'])      
            .thenShouldMatch(       ['a', 'foo'])
            .thenShouldNotMatch(    ['a', 'foo', 'a'])            
            .thenShouldMatch(       ['a', 'foo', 'foo'])
            .thenShouldMatch(       ['a', 'a', 'foo'])
            .thenShouldNotMatch(    ['a', 'a', 'foot'])            
            .thenShouldNotMatch(    ['a', 'foo', 'foo', 'a'])
      }      
      
   ,  testMatchingTwoNamedAncestorsOfRootWorks: function() {
         givenAPattern('!..foo.bar')
             .thenShouldNotMatch(   [])         
            .thenShouldNotMatch(    ['foo'])      
            .thenShouldNotMatch(    ['a', 'foo'])
            .thenShouldMatch(       ['a', 'foo', 'bar'])            
            .thenShouldNotMatch(    ['a', 'foo', 'foo'])
            .thenShouldMatch(       ['a', 'a', 'a', 'foo', 'bar'])
            .thenShouldNotMatch(    ['a', 'a', 'a', 'foo', 'bar', 'a'])
      }
      
   ,  testMatchingTwoNamedAncestorsOfImpliedRootWorks: function() {
         givenAPattern('foo.bar')
             .thenShouldNotMatch(   [])         
            .thenShouldNotMatch(    ['foo'])      
            .thenShouldNotMatch(    ['a', 'foo'])
            .thenShouldMatch(       ['a', 'foo', 'bar'])            
            .thenShouldNotMatch(    ['a', 'foo', 'foo'])
            .thenShouldMatch(       ['a', 'a', 'a', 'foo', 'bar'])
            .thenShouldNotMatch(    ['a', 'a', 'a', 'foo', 'bar', 'a'])
      }      
      
   ,  testMatchingTwoNamedAncestorsSeperatedByStar: function() {
         givenAPattern('!..foo.*.bar')
             .thenShouldNotMatch(   [])         
            .thenShouldNotMatch(    ['foo'])      
            .thenShouldNotMatch(    ['a', 'foo'])
            .thenShouldNotMatch(    ['a', 'foo', 'bar'])            
            .thenShouldMatch(       ['a', 'foo', 'a', 'bar'])            
            .thenShouldNotMatch(    ['a', 'foo', 'foo'])
            .thenShouldNotMatch(    ['a', 'a', 'a', 'foo', 'bar'])
            .thenShouldMatch(       ['a', 'a', 'a', 'foo', 'a', 'bar'])
            .thenShouldNotMatch(    ['a', 'a', 'a', 'foo', 'bar', 'a'])
            .thenShouldNotMatch(    ['a', 'a', 'a', 'foo', 'a', 'bar', 'a'])
      }                  
      
   ,  testMatchingAnyNamedChildOfRootWorks: function() {
         givenAPattern('!.*')
            .thenShouldMatch(       ['foo'])      
            .thenShouldMatch(      ['bar'])            
            .thenShouldNotMatch(    [])
            .thenShouldNotMatch(    ['foo', 'bar'])
      }
      
   ,  testMatchingSequenceOfNamesWorks: function() {
         givenAPattern('!.a.b')
            .thenShouldMatch(       ['a', 'b'])      
            .thenShouldNotMatch(    [])            
            .thenShouldNotMatch(    ['a'])
      }
      
   ,  testNumericIndex: function() {
         givenAPattern('!.a.2')
            .thenShouldMatch(       ['a', 2])      
            .thenShouldMatch(       ['a', '2'])      
            .thenShouldNotMatch(    [])            
            .thenShouldNotMatch(    ['a'])
      }
                 
   ,  testNumericExpressedInArrayNotation: function() {
         givenAPattern('!.a[2]')
            .thenShouldMatch(       ['a', 2])      
            .thenShouldMatch(       ['a', '2'])      
            .thenShouldNotMatch(    [])            
            .thenShouldNotMatch(    ['a'])
      }
      
   ,  testArrayNotation: function() {
         givenAPattern('!["a"][2]')
            .thenShouldMatch(       ['a', 2])      
            .thenShouldMatch(       ['a', '2'])      
            .thenShouldNotMatch(    [])            
            .thenShouldNotMatch(    ['a'])
      }
      
   ,  testArrayNotationAtRoot: function() {
         givenAPattern('![2]')
            .thenShouldMatch(       [2])      
            .thenShouldMatch(       ['2'])      
            .thenShouldNotMatch(    [])            
            .thenShouldNotMatch(    ['a'])
      }
      
   ,  testArrayStarNotationAtRoot: function() {
         givenAPattern('![*]')
            .thenShouldMatch(       [2])      
            .thenShouldMatch(       ['2'])      
            .thenShouldMatch(       ['a'])            
            .thenShouldNotMatch(    [])            
      }            
      
   ,  testTrickyCase: function() {
         givenAPattern('!..foods..fr')
            .thenShouldMatch(       ['foods', 2, 'name', 'fr']);      
      }        

   // now several tests for css4-style pattern matching
   
   ,  testCanReturnCorrectNamedNodeInSimpleCss4StylePattern: function() {      
         givenAPattern('$foo.*')                     
            .thenShouldMatch( 
                  [        'a',      'foo',     'a'], 
                  ['root', 'parent', 'target',  'child'])
                     .returning('target');
      }
      
   ,  testCanReturnCorrectNamedNodeInCss4StylePatternWhenFollowedByDoubleDot: function() {      
         givenAPattern('!..$foo..bar')                     
            .thenShouldMatch( 
                  [        'p',      'foo',    'c',      'bar'], 
                  ['root', 'parent', 'target', 'child',  'gchild'])
                     .returning('target');            
      }
      
   ,  testCanMatchChildrenOfRootWileReturningTheRoot: function() {      
         givenAPattern('$!.*')                     
            .thenShouldMatch( 
                  [        'a'    ], 
                  ['root', 'child'])
                     .returning('root');     
      }                  
      
   ,  testCanReturnCorrectNodeWithArrayStringNotationCss4StylePattern: function() {      
         givenAPattern('$["foo"].bar')         
             .thenShouldMatch( 
                   [        'foo',    'bar'  ], 
                   ['root', 'target', 'child'])
                      .returning('target');
      }
      
   ,  testCanReturnCorrectNodeWithArrayNumberedNotationCss4StylePattern: function() {      
         givenAPattern('$[2].bar')         
             .thenShouldMatch( 
                   [        '2',      'bar'  ], 
                   ['root', 'target', 'child'])
                      .returning('target');
      }      
      
   ,  testCanReturnCorrectNodeInInStarCss4StylePattern: function() {      
         givenAPattern('!..$*.bar')         
             .thenShouldMatch( 
                   [        'anything', 'bar'  ], 
                   ['root', 'target',   'child'])
                      .returning('target');
      }
      
   ,  testCanReturnCorrectNodeInInArrayStarCss4StylePattern: function() {      
         givenAPattern('!..$[*].bar')         
             .thenShouldMatch( 
                   [        'anything', 'bar'  ], 
                   ['root', 'target',   'child'])
                      .returning('target');
      }          
      

   });
   
   function givenAPattern( pattern ) {
   
      return new Asserter(pattern);     
   }
   
   // for the given pattern, return an array of empty objects of the one greater length to
   // stand in for the nodestack in the cases where we only care about match or not match.
   // one greater because the root node doesnt have a name
   function fakeNodeStack(path){
   
      var rtn = path.map(function(){return {}});
      
      rtn.unshift({iAm:'root'});
      return rtn;      
   }
   
   function Asserter( pattern ){
      this._pattern = pattern;
      
      try {
         this._compiledPattern = jsonPathCompiler(pattern);
      } catch( e ) {
         fail( 'problem parsing:' + pattern + "\n" + e );
      }          
   }
   
   Asserter.prototype.thenShouldMatch = function(path, nodeStack) {

      nodeStack = nodeStack || fakeNodeStack(path);
      
      this._lastResult = this._compiledPattern(path, nodeStack);

      try{   
         assertTrue( 
            'pattern ' + this._pattern + ' should have matched ' + '(' + path.join('.') + ')'
         ,   !!this._lastResult 
         );
      } catch( e ) {
         fail( 'Error running pattern "' + this._pattern + '" against path ' + '(' + path.join('.') + ')' + "\n" + e );      
      }      
      
      return this;
   };
   
   Asserter.prototype.thenShouldNotMatch = function(path, nodeStack) {

      nodeStack = nodeStack || fakeNodeStack(path);
      
      this._lastResult = this._compiledPattern(path, nodeStack);      
         
      try{
         assertFalse( 
            'pattern ' + this._pattern + ' should not have matched ' + '(' + path.join('.') + ')'
         ,  this._lastResult
         );
      } catch( e ) {
         fail( 'Error running pattern "' + this._pattern + '" against path ' + '(' + path.join('.') + ')' + "\n" + e );      
      }    
        
      return this;         
   };
   
   Asserter.prototype.returning = function(node) {
      assertEquals(node, this._lastResult);
      
      return this;
   };      

})();