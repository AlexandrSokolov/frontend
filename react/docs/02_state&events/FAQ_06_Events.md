todo

### the name convention

The convention is that React’s events are named with camelCase like onClick, onSubmit, onKeyDown… whereas the HTML events are all lowercase (onclick, onsubmit, onkeydown). React will actually warn you if you use the wrong capitalization:

Warning: Unknown event handler property onclick. Did you mean `onClick`?

### event handler parameter

Your event handler function will receive the event object, which looks a lot like a native browser event. It has the standard stopPropagation and preventDefault functions if you need to prevent bubbling or cancel a form submission, for example. It’s not actually a native event object though – it is a SyntheticEvent.

### propagation control

### ?

The event object passed to a handler function is only valid right at that moment. The SyntheticEvent object is pooled for performance. Instead of creating a new one for every event, React replaces the contents of the one single instance.

If you print it out with console.log(event), the instance logged to the console will be cleared out by the time you go to look at it. You also can’t access it asynchronously (say, after a timeout). If you need to access it asynchronously, you can call event.persist() and React will keep it around for you.

