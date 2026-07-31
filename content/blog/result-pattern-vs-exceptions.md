---
title: Result Pattern vs Exceptions in C#
description: When to reach for the Result pattern instead of exceptions in .NET, how to implement it in C#, and what it actually costs.
tags:
  - csharp
  - dotnet
  - architecture
---

In recent years, the Result pattern has gained popularity as an alternative approach of managing error cases, particularly in languages like F#, Go and Rust, and is now increasingly applied in C# applications. In this article I would like to explore the Result pattern, discuss its implementations, and compare it with the traditional exception-based error handling in .NET C#.
## What's the problem with a good old exception?

The general problem is:

> *Exceptions are **extremely expensive** and they are even more expensive in asynchronous code because of the need to keep the Error Stack Trace* 
 
Conservative recommendation:
* exceptions are only for exceptional situations
* when there is no way to recover
* use fail fast principle

Where we know how to handle exception, we can use Result pattern (e.g. for data validation)

## What is the Result Pattern?

The Result pattern is a way of handling operations that may fail, encapsulating both success and failure outcomes within a single object.

In a typical Result pattern implementation, a `Result<T>` type contains either a successful value of type `T` or an error message or status code indicating the failure.

```C#
public interface IFoo
{
	//you should except some exceptions to be thrown in this method
	public string GetFoo();

	//Result Pattern, errors are part of returned object
	public Result<string> GetFooResult();

	//Async version
	public Task<Result<string>> GetFooResultAsync();
}

```

`Result` might look something like this:

```C#
public class Result<T>
{
    public T Value { get; }
    public string ErrorMessage { get; }
    public bool IsSuccess { get; }

    private Result(T value, string errorMessage, bool isSuccess)
    {
        Value = value;
        ErrorMessage = errorMessage;
        IsSuccess = isSuccess;
    }

    public static Result<T> Success(T value) => new Result<T>(value, null, true);
    public static Result<T> Failure(string errorMessage) => new Result<T>(default, errorMessage, false);
}

```

When an operation is performed, it returns a `Result` rather than throwing an exception for failure. The calling code checks the `IsSuccess` property to determine if the operation succeeded, then either accesses the `Value` or handles the `ErrorMessage`.

Usage:
```C#
public Result<int> ParseNumber(string input)
{
    if (int.TryParse(input, out int number))
    {
        return Result<int>.Success(number);
    }
    return Result<int>.Failure("Invalid number format");
}

var result = ParseNumber("123");
if (result.IsSuccess)
{
    Console.WriteLine($"Parsed number: {result.Value}");
}
else
{
    Console.WriteLine($"Failed to parse number: {result.ErrorMessage}");
}

```

---

## Advantages of the Result Pattern

1. **Explicit Error Handling**  
    Unlike exceptions, which can be thrown and potentially forgotten to be caught, the Result pattern enforces error handling as part of the code’s control flow. Each `Result` object explicitly signals success or failure, making error cases less prone to be overlooked.
    
2. **Reduced Runtime Overhead**  
    Exceptions in .NET come with a certain performance overhead, especially in high-frequency operations where numerous exceptions may be thrown. The Result pattern avoids these overheads by not utilizing the .NET exception system, making it beneficial in performance-critical scenarios.
    
3. **Improved Readability and Debugging**  
    Since the Result pattern uses a single return object for both success and failure, it keeps the code cleaner and more readable. The code path becomes clear because every possible outcome of the operation is handled in one place without relying on `try-catch` blocks scattered throughout the code.
    
4. **Better Predictability in Asynchronous Code**  
    In asynchronous methods, exceptions propagate in a non-linear way and can be difficult to track down. Using the Result pattern in async operations can make error handling more predictable and prevent unhandled exceptions that could cause unexpected behavior in async flows.
    
5. **Type Safety**  
    By using a well-defined `Result<T>` type, developers gain the advantage of type safety, reducing the likelihood of unintended bugs compared to throwing and catching exceptions of varying types.
   
## Disadvantages of the Result Pattern

1. **Boilerplate Code**  
    The Result pattern introduces more boilerplate code since each method must return a `Result<T>` object and the calling code has to check for success or failure. This can make the code verbose and potentially cluttered, especially if `Result` handling is done frequently.
    * "In a system where performance isn't a big issue, you should prefer the solution with throwing custom exceptions instead of the notification pattern style; it will slow you down regarding maintenance because using functions are not always obvious/visible like custom exceptions do, and I like the always valid pattern where the state of an object is valid in any case.
    
2. **Incompatibility with Exception-Based Libraries**  
    Many third-party libraries use exceptions to communicate errors. Integrating the Result pattern with these libraries often requires additional handling or wrapping, which can complicate code structure.
    
3. **Lack of Stack Trace Information**  
    Exceptions provide a stack trace, which is very useful for debugging. The Result pattern does not include this information by default, making it more challenging to trace the origin of an error unless additional logging is added.
    
4. **Cognitive Load**  
    The Result pattern shifts error handling from being automatic (as exceptions are caught or propagated by the runtime) to being manual. Developers have to remember to check each `Result` object, which could lead to bugs if a check is missed. Exceptions were introduced to let you no longer have to check an error code after invoking a function/method. This new fashion is a step backwards
    
5. **Chaining and Functional Composition**  
    The Result pattern can make it challenging to chain multiple operations in a functional style, which exceptions naturally support. Although libraries like `LanguageExt` in .NET provide a `Try` or `Result` monad to support chaining, it adds complexity to the codebase.
    
## Comparing Result Pattern and Exceptions

|Criteria|Exceptions|Result Pattern|
|---|---|---|
|**Performance**|Higher overhead in frequent throws|Reduced overhead|
|**Error Handling**|Implicit, error-catching required|Explicit, caller must handle|
|**Readability**|Scattered try-catch can reduce readability|Unified error handling in return object|
|**Stack Trace**|Provides stack trace for debugging|No built-in stack trace|
|**Code Simplicity**|Cleaner without explicit success/failure checks|More boilerplate, each call must handle success/failure|
|**Integration**|Well-integrated with .NET libraries|Requires adaptation for exception-based libraries|

---

## When to Use the Result Pattern

The Result pattern is often beneficial in scenarios where you need:
- High-performance operations where exceptions might create overhead.
- Clear and explicit error handling, such as in APIs or business logic where errors should not go unnoticed.
- Situations where stack traces are not essential for troubleshooting or where additional logging mechanisms are in place.

## Conclusion

The Result pattern in .NET C# offers a structured, explicit, and often more performant alternative to exceptions, making it ideal for scenarios requiring high control over error handling. However, its verbosity and lack of stack trace information make it less suitable for all situations. When combined thoughtfully with traditional exception handling, the Result pattern can add robustness and readability to your .NET applications, especially when handling predictable, recoverable errors in critical operations.

> "Exceptions should never be used to control regular program flow (as many people do) but be reserved to real problems that need to be debugged, and that's because whenever you throw an exception a stack trace is created, that's what causes the exception control to be so slow compared to a result return, .Net retrieves tons of information about the execution status of the program including many stackframes to be able to trace the executed code, that's only relevant when you need to debug your code, in any other case your program does not care at all at which line some exception was generated, it only cares about the type to use it as a result, what is a complete waste of resources."

The usage of the  Result pattern is very limited, you should understand all pros and cons of that decision as it might decrease the maintainability of your code and increase the boilerplate. all your potential team members should be aware of proper using of this pattern and it most likely should be limited in using of specific scope, when it might be indeed helpful.
## NuGet packages

https://github.com/altmann/FluentResults - separate solution

https://github.com/louthy/language-ext - as a part of a big library of functional programming tools

[[https://www.reddit.com/r/dotnet/comments/14tfpze/result_pattern_languageext_vs_functionalextensions/ | See comparison discussion on Reddit ]]
## References

https://andrewlock.net/series/working-with-the-result-pattern/

https://www.youtube.com/watch?v=E3dU9Y1CsnI

https://www.youtube.com/watch?v=C_u1WottRA0

https://www.youtube.com/watch?v=a1ye9eGTB98







