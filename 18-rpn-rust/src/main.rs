use std::collections::HashMap;

#[derive(Debug, Clone)]
enum Value {
    string(String),
    u64(u64),
}

#[derive(Debug)]
struct Context {
    stack: Vec<Value>,
    functions: HashMap<String, Function>,
}

impl Context {
    fn new() -> Context {
        Context { stack: vec![], functions: HashMap::new() }
    }

    fn push(&mut self, v: &Value) {
        self.stack.push(v.clone());
    }

    fn exec(&mut self, word: String) {
        match self.functions.get(&word) {
            Some(f) => process(&mut self.stack, f),
            _ => {
                panic!("No method exists for {}", word);
            }
        }
    }

}

fn process(stack: &mut Vec<Value>, f: &Function) {
    // validate sufficient arguments
    // validate arg types match
}

#[derive(Debug)]
enum Op {
    add_u64,
}

#[derive(Debug)]
struct VArg {
    name: String,
    value: Value,
}

#[derive(Debug)]
struct Function {
    name: String,
    args: Vec<String>,
    body: Vec<Op>,
}

fn main() {
    let mut context: Context = Context::new();

    let add = Function {
        name: "+".to_string(),
        args: vec![
            "u64".to_string(),
            "u64".to_string(),
        ],
        body: vec![
            Op::add_u64,
        ],
    };

    context.functions.insert("+".to_string(), add);

    context.push(&Value::u64(11));
    context.push(&Value::u64(20));

    context.exec(String::from("+"));

    println!("\n{:?}\n", context.stack);
}
